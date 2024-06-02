<template>
    <main>
        <article>
            <section>
                <h1>Välkommen till musikhörnan!</h1>
                <h3>Här låter det skapligt!</h3>
                <p>
                    Jag har nått den ärevördiga åldern av 34 år. Av denna anledning har det blivit oerhört svårt att
                    hitta nya saker att lyssna på.
                    Jag Vill därför be DIG, käre besökare, att lämna några vettiga musikrekommendationer åt mig.
                    Använd formuläret nedan för att skriva in någon bra skiva jag kan söka upp och konsumera.
                    Om det är så att du själv känner att det är svårt att hitta något att lyssna på - ta en titt i
                    listan av rekommendationer vettja!
                    <br><br>
                    Om det är så att något i listan kränker dig - dvs om du inte kan STÅ UT med åsynen av något i listan
                    alternativt om någon begått dödssynden
                    att felstava din favoritartists namn etc: klicka på "redigera" så kan du radera eller modifiera den
                    information som visas.
                    <br><br>
                    jag litar på er. Ni där ute på nätet är ju de mest pålitliga och samvetsgranna människor som finns.
                    <br><br>
                    eller hur?
                </p>
            </section>
            <section class="content_container">
                <h1>Veckans rekommendationer:</h1>
                <h3>Här är denna veckas rekommendationer:</h3>
                <div class="recomendations">
                    <Album v-for="Album in Albums" :Album="Album" :key="Albums.id" />
                </div>
            </section>
        </article>
        
        <article>
            <section class="content_box">
                <h1 class="form_heading">Skriv in ny rekommendation här!</h1>

                <form @submit.prevent="Reg_Rec()">

                    <label for="name">Namn på skiva:</label>
                    <input type="text" name="name" id="name" v-model="name">

                    <label for="artist">Namn på artist:</label>
                    <input type="text" name="artist" id="artist" v-model="artist">

                    <label for="Description">Fri beskrivning av skivan</label>
                    <input type="text" name="description" id="description" v-model="description">

                    <label for="Best">Bästa låten?</label>
                    <input type="text" name="best" id="best" v-model="best">

                    <label for="Worst">Sämsta låten?</label>
                    <input type="text" name="worst" id="worst" v-model="worst">

                    <label for="runtime">Hur lång är skivan (i minuter?)</label>
                    <input type="number" name="runtime" id="runtime" v-model="runtime">

                    <label for="submit">Skicka in</label>
                    <input type="submit" value="submit" id="submit">
                </form>
                <h2>{{ error_message }}</h2>
            </section>
        </article>
    </main>
</template>

<script>
import Album from "../components/Album.vue"

export default {

    data() {
        return {
            //albumobjektet:
            Albums: [

            ],

            error_message: "",

            //fälten i formuläret bundna via V-model, har följande initialvärden:
            name: "",
            artist: "",
            description: "",
            best: "",
            worst: "",
            runtime: 0
        }
    },


    components: {
        Album
    },

    methods: {
        checkMethods() {
            console.log("Hejsan");
        },

        async get_All_Albums() {
            //lägger URL till API i en konstant:
            const URL = "http://localhost:3000/album/";

            //Gör ett fetch-anrop med url-variabeln:
            const resp = await fetch(URL, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            });

            //är det något fel vill jag ha felkod för problemet:
            if (!resp.ok) {
                throw new Error(`HTTP error! Status: ${resp.status}`);
            };

            //sparar ner svar här och konsoll-loggar:
            const data = await resp.json();
            console.log(data);

            //lägger in svars-data i produkt-objektet för utskrift till skärmen:
            this.Albums = data;
        },

        async Reg_Rec() {
            //skapar en konstant för URL:
            const URL = "http://localhost:3000/album/";

            

            //skapar objekt med formulär-data:
            const Rec_Data = {
                name: this.name ,
                artist: this.artist,
                description: this.description,
                best: this.best,
                worst: this.worst,
                runtime: this.runtime
            }

            //foreach loopar för att identifiera tomma fält:
            Object.keys(Rec_Data).forEach((key) => {
                if (Rec_Data[key] === "") {
                    this.error_message = "Det fattas data i formuläret!";
                    // om egenskapens värde är en tom textsträng ska detta raderas från objektet
                    throw new Error("Missad data i formuläret! Fyll i all data!");
                   
                } 
            });

            //Skapar fetch-anrop:
            const resp = await fetch(URL, {
                //metoden ska vara POST
                method: "POST",
                //Jag vill skicka JSON:
                headers: {
                    "Content-Type": "application/json"
                },

                //Bodyn ska vara formulärdata i JSON-format:
                body: JSON.stringify(Rec_Data)
            })

            //om responsen inte är ok...
            if (!resp.ok) {
                //... logga error i konsolen med statuskod
                console.error('Registration request failed. Status Code: ' + response.status);
                //och ge mig Error
                throw new Error('Registration request failed');
            }

            //Invänta svar från anrop...
            const data = await resp.json();
             console.log(data);
             if(data){
                window.location.reload();
             };

        }



    },
    mounted() {
        this.checkMethods();
        this.get_All_Albums();
    }
}
</script>

<style scoped>
main {
    border-top: double black 3px;
    border-top-left-radius: 25%;
    border-top-right-radius: 25%;
    padding-top: 100px;
}

.content_container {
    border-top: dotted black 3px;
}

.form_heading {
    text-align: center;
    margin-top: 50px;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid black 2px;
    padding: 20px;
    border-radius: 25px;
    background-color: rgb(208, 255, 239);
}

input {
    width: 250px;
    height: 40px;
}

#submit {
    width: 150px;
    cursor: pointer;
}
</style>