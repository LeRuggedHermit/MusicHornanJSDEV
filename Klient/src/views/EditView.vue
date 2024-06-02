<template>
    <main>
        <h4 id="returner">
            <RouterLink to='/'>återvänd</RouterLink>
        </h4>
        <article>


            <section class="content_box">
                <h1>Inlägg att redigera:</h1>
                <h2>Skivans namn: {{ Albums.name }}</h2>
                <h3>Artistens namn: {{ Albums.artist }}</h3>
                <h3>Fri beskrivning av albumet: {{ Albums.description }}</h3>
                <h3>Albumets bästa låt: {{ Albums.best }}</h3>
                <h3>Albumets sämsta låt: {{ Albums.worst }}</h3>
                <h3>Albumets längd: {{ Albums.runtime }} minuter</h3>
            </section>

            <section class="form_box">

                <h1 class="form_heading">Uppdatera rekommendation här!</h1>
                <p>Fyll i det fält du vill uppdatera och lämna alla andra fält blanka.</p>
                <form @submit="Update_album">

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
                <h2>{{ Update_message }}</h2>
            </section>

            <section class="deleter">
                <h4>Radera Album</h4>
                <h5>När du raderat kan du inte få tillbaka albumet!</h5>
                <!--Knapp för att radera: -->
                <button @click="deleteAlbum" id="delete_btn">Radera</button>

                <h2> {{ Delete_message }} </h2>
            </section>

        </article>
    </main>
</template>


<!--Skript: -->
<script>

import Album from "../components/Album.vue"
import HomeView from "./HomeView.vue";


export default {

    data() {
        return {
            //albumobjektet:
            Albums: [

            ],
            Update_message: ""
            ,
            Delete_message: "",
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

        async get_one_Album() {
            //lägger URL till API i en konstant:

            let album_id = this.$route.params.id;
            const URL = `http://localhost:3000/album/${album_id}`;


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

        async Update_album(event) {
            // Förhindrar formulär från att dra igång:
            event.preventDefault();

            //hämtar in id i från URL-parameter:
            let album_id = this.$route.params.id;

            //lägger in denna i URL för PUT-anrop:
            const URL = `http://localhost:3000/album/${album_id}`;

            const data = {
                name: this.name,
                artist: this.artist,
                description: this.description,
                best: this.best,
                worst: this.worst,
                runtime: this.runtime
            }

            //foreach loopar för att identifiera tomma fält:
            Object.keys(data).forEach((key) => {
                if (data[key] === "") {
                    // om egenskapens värde är null ska detta raderas från objektet
                    delete data[key];
                    //detsamma ska ske i det fallet att datan är 0
                } else if (data[key] === 0) {
                    delete data[key];
                }
            });

            console.log(data);

            const response = await fetch(URL, {
                //metoden ska vara PUT
                method: "PUT",
                //Vi ska skicka JSON:
                headers: {
                    "Content-Type": "application/json"
                },
                //Bodyn ska vara formulärdata i JSON-format:
                body: JSON.stringify(data)
            });

            //om responsen inte är ok...
            if (!response.ok) {
                //... logga error i konsolen med statuskod
                console.error('Registration request failed. Status Code: ' + response.status);
                //och ge mig Error
                throw new Error('Registration request failed');
            } else {
                //Invänta svar från anrop...
                const RespData = await response.json();
                console.log(RespData);
                window.location.reload;

            }


            this.Update_message = "Album-info uppdaterad!"

        },

        async deleteAlbum() {
            //lägger URL till API i en konstant:

            let album_id = this.$route.params.id;
            const URL = `http://localhost:3000/album/${album_id}`;

            try {
                const response = await fetch(URL, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                //om responsen är ok...
                if (response.ok) {

                    // Får vi svaret från anropet med att produkten är raderad:
                    const DeleteResponse = await response.json();

                    // logga meddelande för säkerhets skull:
                    console.log(DeleteResponse);

                    this.Delete_message = "Rekommendation raderad för evigt"
                }

                else {
                    console.error('Delete request failed. Status Code: ' + response.status);
                    throw new Error('delete request failed');// Hantera error
                }

            } catch (error) {
                //här kan vi hantera nätverksfel
            }
        },

        mounted() {
            this.get_one_Album()
        }

    }
}

</script>

<!--Lokala CSS-regler: -->
<style scoped>
main {
    border-top: double black 3px;
    border-top-left-radius: 25%;
    border-top-right-radius: 25%;
    padding-top: 100px;
}

#returner {
    border-top: solid black 2px;
    border-bottom: solid black 2px;
    text-align: center;
}

article {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: center;

}

.content_box {
    text-align: center;
    background-color: rgb(206, 164, 246);
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
</style>