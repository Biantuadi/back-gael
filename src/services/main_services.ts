// import Album from '../models/medias/album.model';
// import Song from '../models/medias/song.model';

/**
 * app.put('/', (req, res) => {
  // Rechercher toutes les chansons dans la base de données
  Song.find({}).then((songs) => {
    songs.forEach((song:any) => {
      // Extraire l'ID du fichier à partir du lien original
      const fileId = song.songLink.split('/d/')[1].split('/view')[0];
      // Construire le nouveau lien de téléchargement direct
      const newSongLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
      // Mettre à jour le songLink pour chaque chanson avec le nouveau lien
      song.songLink = newSongLink;
      // Enregistrer les modifications dans la base de données

      song.save();
    });
    res.send('done');
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Erreur lors de la mise à jour des chansons.');
  });
});
 */

// ajouter les songs dans les albums respectifs
/**
 * app.put('/', async (req, res) => {
  try {
    const albums = await Album.find({}).populate('songs');

    for (const album of albums) {
      // Trouver toutes les chansons ayant song.album === album._id
      const songsToUpdate = await Song.find({ album: album._id });

      // Réinitialiser la liste des chansons de l'album
      album.songs = [];

      // Ajouter toutes les chansons trouvées à la liste des chansons de l'album
      album.songs.push(...songsToUpdate);

      // Enregistrer les modifications de l'album dans la base de données
      await album.save();
    }

    res.send('done');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la mise à jour des albums.');
  }
});
 */
