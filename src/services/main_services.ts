// import Album from '../models/medias/album.model';
// import Song from '../models/medias/song.model';

// app.put('/', (req, res) => {
//     // Mettre à jour songLink
//     Song.find({}).then((songs) => {
//       songs.forEach((song:any) => {
//         const songLink = song.songLink.split('usp=sharing')[0] + 'view?usp=sharing';
//         // Mettre à jour le songLink pour chaque chanson
//         song.songLink = songLink;
//         // Enregistrer les modifications dans la base de données
//         song.save();
//       });
//       res.send('done');
//     }).catch((err) => {
//       console.error(err);
//       res.status(500).send('Erreur lors de la mise à jour des chansons.');
//     });
//   });

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
