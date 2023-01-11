/* eslint-disable no-unused-vars */
const autoBind = require('auto-bind');

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
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
    const { id } = request.params;
    const album = this._service.getAlbumById(id);
    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  putAlbumByIdHandler(request, h) {
    const { id } = request.params;

    this._service.editAlbumById(id, request.payload);

    return {
      status: 'success',
      message: 'Berhasil mengubah data album',
    };
  }

  deleteAlbumByIdHandler(request, h) {
    const { id } = request.params;
    this._service.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Data berhasil dihapus',
    };
  }
}

module.exports = AlbumsHandler;
