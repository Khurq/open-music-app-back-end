const autoBind = require('auto-bind');

class AlbumsHandler {
  constructor(service) {
    this._service = service;

    autoBind(this);
  }

  postAlbumHandler(request, h) {
    const { name = 'untitled', year } = request.payload;

    const albumId = this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  getAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const album = this._service.getAlbumById(id);
      return {
        status: 'success',
        data: {
          album,
        },
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  putAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;

      this._service.editAlbumById(id, request.payload);

      return {
        status: 'success',
        message: 'Berhasil mengubah data album',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  deleteAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.deleteAlbumById(id);

      return {
        status: 'success',
        message: 'Data berhasil dihapus',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        nessage: error.message,
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = AlbumsHandler;
