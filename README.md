# MusicHornanJSDEV
Första uppladdning av det som behövs för att köra min applikation för musik-rekommendationer. 
Repot innehåller två kataloger: 
API och Klient.
API avser backend och består av en webbtjänst byggd med node.js, express och mongoose och är ämnad att användas tillsammans med en MongoDB-databas vid namn MusicDB. Den definierar en modell, och använder mongoose-modell-metoder för att göra anrop mot databasen genom en controller.

Klient avser front-end och använder ramverket Vue.js för att skapa en SPA där data hämtas, skickas, uppdateras och raderas i databasen för att generera en "community driven" musikrekommendationslista.
