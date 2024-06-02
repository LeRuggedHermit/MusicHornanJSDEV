<template>

    <div class="rec">
        <h4>{{ Album.name }}</h4>
        <h4>{{ Album.artist }}</h4>
        <p>{{ Album.best }}</p>
        <p>{{ Album.worst }}</p>
        <p>{{ Album.description }}</p>
        <p>{{ Album.runtime }}</p>
         <!--Länk till sidan där vi kan uppdatera eller radera en produkt-->
         <RouterLink :to="updateAlbumRoute">Hantera produkt</RouterLink>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router'
export default {
    props: {
        Album: Object
    },
    //computed används för att få ut det dynamiska värdet av en prop beroende på komponentens state
    computed: {
        //detta möjliggör för oss att generera en enskild identifierbar väg till en produkt
        //genom id från produkt-objektet:
    updateAlbumRoute() {
      return `/Edit/${this.Album._id}`;
    }}
}
</script>

<style scoped>
.recomendations {
    width: 100%;
    display: flex;
    justify-content: center;
}

.rec {
    background-color: rgb(206, 164, 246);
    border: solid black 1px;
    width: fit-content;
    padding: 10px;
    margin: 10px;
}
</style>