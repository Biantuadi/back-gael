// route add songs to a specific album => where Song.album = album.id

// app.post('/addSongsToAlbums/', async (req, res) => {
//   const songs = await Song.find();
//   const albums = await Album.find();

//   try {
//     albums.forEach(async (album) => {
//       const songsToAdd = songs.filter(song => song.album === album.id);
//       await Album.findByIdAndUpdate(album.id, { songs: songsToAdd });
//     });
//     res.status(200).json({ message: 'Songs added to albums' });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }

// });