export default class RenderBuffer {
  /**
   * @constructor
   * @param {Device} device
   * @param {RB_FMT_*} format
   * @param {Number} width
   * @param {Number} height
   */
  constructor(device, format, width, height) {
    this._device = device;
    this._format = format;
    this._width = width;
    this._height = height;

    const gl = device._gl;
    this._rb = gl.createRenderbuffer();

    gl.bindRenderbuffer(gl.RENDERBUFFER, this._rb);
    gl.renderbufferStorage(gl.RENDERBUFFER, format, width, height);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
  }

  /**
   * @method destroy
   */
  destroy() {
    if (this._rb === null) {
      console.error('The render-buffer already destroyed');
      return;
    }

    const gl = this._device._gl;

    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.deleteRenderbuffer(this._rb);

    this._rb = null;
  }
}