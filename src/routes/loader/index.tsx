import { Player } from '@lottiefiles/react-lottie-player';
// import "./style.scss"

const Loader = () => {
    return (
			<div className="loader-container">
                <div className="loader8"></div>
                <Player
                    autoplay
                    loop
                    src="/loaders/animation1.json"
                    style={{ height: '300px', width: '300px' }}
                    >
                    {/* <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} /> */}
                </Player>
            </div>
    )
}

export default Loader;