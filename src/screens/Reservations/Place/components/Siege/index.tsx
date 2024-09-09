import "./style.scss";

type PlaceCardProps = {
    status: "occupe" | "libre" | "attente";
    id: string;
    numPlace: number;
    onClick?: () => void; // Ajout du onClick ici
};

type SiegeProps = {
    onPlaceClick: (status: string, id: string) => void;
};

export function Siege({ onPlaceClick }: SiegeProps) {
    const statuses = ["occupe", "libre", "attente"] as const;

    const fakeData: PlaceCardProps[] = Array.from({ length: 18 }, (_, index) => ({
        status: statuses[index % 3],
        id: `place-${index + 2}`,
        numPlace: index + 2,
    }));

    return (
        <div className="container-place">
            <div className="place-container first-row">
                <div className="chauffeur">
                    <Driver icon="/icons/driver.svg" />
                </div>
                <div className="place-container-right">
                    {fakeData.slice(0, 2).map((data) => (
                        <PlaceCard
                            key={data.id}
                            {...data}
                            onClick={() => onPlaceClick(data.status, data.id)}
                        />
                    ))}
                </div>
            </div>
            <div className="place-container rest-rows">
                {fakeData.slice(2).map((data) => (
                    <PlaceCard
                        key={data.id}
                        {...data}
                        onClick={() => onPlaceClick(data.status, data.id)}
                    />
                ))}
            </div>
        </div>
    );
}

function PlaceCard({ status, id, numPlace, onClick }: PlaceCardProps) {
    return (
        <div className={"place-card " + status} id={id} onClick={onClick}>
            {numPlace}
        </div>
    );
}

type iconType = {
    icon: string;
};

function Driver({ icon }: iconType) {
    return (
        <div className={"place-card driver"}>
            <img src={icon} width={40} />
        </div>
    );
}
