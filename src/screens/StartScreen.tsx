export default function StartScreen({ onNext }: { onNext: () => void }) {
    return (
        <div className="start-screen">
            <div
                className="start-screen-background"
                style={{ backgroundImage: 'url("background.png")' }}
            >
                <div className="start-screen-overlay">
                    <div className="start-screen-content">
                        <div className="start-screen-header">
                            <h1 className="start-screen-title">Choice!</h1>
                            <h2 className="start-screen-subtitle">Dokonuj mądrych wyborów</h2>
                        </div>

                        <div className="start-screen-sponsors">
                            <img
                                src="https://alfred.dailyweb.pl/wp-content/uploads/2019/07/hackyeah_logo.jpg"
                                alt="HackYeah Logo"
                                className="sponsor-logo"
                            />
                            <img
                                src="https://samorzad.gov.pl/photo/format/f9f46532-e83f-4d3b-8354-a1b06c9ec3b6/resolution/1920x810"
                                alt="Samorząd Uczniowski Logo"
                                className="sponsor-logo"
                            />
                        </div>

                        <button className="start-screen-button" onClick={onNext}>
                            Zaczynamy!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}