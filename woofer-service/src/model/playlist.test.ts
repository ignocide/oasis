import Playlist from './playlist';

describe('Playlist', () => {
  test('constructor', () => {
    let mock = {
      id: 7,
      name: '추가된 플레이리스트',
      userId: 1,
      isDefault: true,
      createdAt: "2019-04-16T08:08:43.000Z",
      updatedAt: "2019-04-16T08:08:43.000Z",
    };
    let playlist = new Playlist(mock);

    expect(playlist.id).toEqual(mock.id);
    expect(playlist.name).toEqual(mock.name);
    expect(playlist.userId).toEqual(mock.userId);
    expect(playlist.createdAt).toEqual(new Date(mock.createdAt));
    expect(playlist.updatedAt).toEqual(new Date(mock.updatedAt));
  });
});
