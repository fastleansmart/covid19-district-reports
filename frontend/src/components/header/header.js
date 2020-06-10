import React from 'react';
import Typography from '@material-ui/core/Typography';

class Header extends React.Component {
    render() {
        return (
            <div id="header">
                <Typography variant="h4" component="h1" gutterBottom>
                    Covid-19 Falldaten für Kreise
                </Typography>
                <Typography variant="body1" component="p" id="introductory-text">
                    Willkommen auf der Covid-19 Falldaten-App für alle deutschen Kreise.
                    Auf dieser Seite können die bisher gemeldeteten Fallzahlen eingesehen und neue Zahlen eingereicht werden.
                    Es gibt die Übersichts-Seite, auf der tabellarischen Falldaten einsehbar sind.
                    Unter dem Menüpunkt "Daten erfassen" können aktuelle Daten eines Kreises erfasst werden.
                </Typography>
            </div>
        )
    }
}

export { Header };