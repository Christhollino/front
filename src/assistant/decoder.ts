import { similarity } from "./levenstein";

interface DecoderInt {
  data: string;
}

class Decoder implements DecoderInt {
  data: string;
  knownKey: string[];
  refactedData: string[];
  negationList: string[];
  clickVariants: string[];
  greetingVariants: string[];
  closeVariants: string[];
  clickableData: string[];
  closerData: string[];

  constructor(data: string, clickableData: string[], closerData: string[]) {
    this.data = data;
    this.clickVariants = [
      "clicker", "cliquer", "taper", "appuyer", "sélectionner", "choisir", "ouvrir",
      "valider", "actionner", "presser", "tapoter", "aller", "surfer"
    ];
    this.greetingVariants = [
      "bonjour", "salut", "coucou", "hello", "hey", "bonsoir", "salutations"
    ];
    this.closeVariants = [
      "fermer", "clore", "terminer", "quitter", "partir", "arrêter"
    ];

    this.clickableData = clickableData;
    this.closerData = closerData;
    this.knownKey = this.concatWithVariants(clickableData);
    this.negationList = ["pas", "ne", "ni", "non"];
    this.refactedData = this.refactByLevenstein(this.splitText(this.data.toLocaleLowerCase()), this.knownKey);
    this.refactedData = this.removeNegation();
  }

  private splitText(text: string): string[] {
    return text.split(/[^a-zA-Z0-9]+/).filter(word => word.length > 0);
  }

  private concatWithVariants(knownKey: string[]): string[] {
    return knownKey.concat(this.clickVariants, this.greetingVariants, this.closeVariants);
  }

  private refactByLevenstein(chaine: string[], knownKey: string[]): string[] {
    return chaine.map(word => {
      let maxSimilarity = 0;
      let bestMatch = word;

      for (const key of knownKey) {
        const sim = similarity(word, key);
        if (sim > 0.65 && sim > maxSimilarity) {
          maxSimilarity = sim;
          bestMatch = key;
        }
      }

      return bestMatch;
    });
  }

  private removeNegation(): string[] {
    console.log(this.knownKey)
    // console.log()
    const result: string[] = [];
    let negate = false;

    for (const word of this.refactedData) {
      if (this.negationList.includes(word)) {
        negate = !negate;
        continue;
      }

      if (!negate && this.knownKey.includes(word)) {
        result.push(word);
      }
    }

    return result;
  }

  decode(): { text: string; action: "ouvrir" | "fermer" | null; target: string | null } {
    let action: "ouvrir" | "fermer" | null = null;
    let greetingText = "";
    let actionText = "";
    let target: string | null = null;

    for (const word of this.refactedData) {
      if (this.greetingVariants.includes(word)) {
        greetingText = "Bonjour!";
      } else if (this.clickVariants.includes(word)) {
        action = "ouvrir";
        actionText = "Bien sur, Je vais vous l'ouvrir.";
        target = this.findTarget(this.refactedData, this.clickableData);
      } else if (this.closeVariants.includes(word)) {
        action = "fermer";
        actionText = "Bien sur Je vais le fermer.";
        target = this.findTarget(this.refactedData, this.closerData);
      }
    }

    const text = greetingText || actionText || "Juste patiente";
    return { text, action, target };
  }

  private findTarget(refactedData: string[], data: string[]): string | null {
    for (const word of refactedData) {
      if (data.includes(word)) {
        return word;
      }
    }
    return null;
  }

  test() {
    console.log(this.decode());
  }
}

export { Decoder };
