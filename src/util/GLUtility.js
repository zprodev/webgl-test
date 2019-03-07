/**
 * WebGLのデータ割り当てなどをサポート
 */
export default class GLUtility {
  /**
   * WebGLShader生成
   * @param {WebGLRenderingContext} gl 
   * @param {number} type 作成するシェーダーのタイプ
   * @param {string} source シェーダーコード
   * @returns {WebGLShader}
   */
  static createShader(gl, type, source){
    // シェーダの生成
    var shader = gl.createShader(type);
    // 生成されたシェーダにソースを割り当てる
    gl.shaderSource(shader, source);
    // シェーダをコンパイルする
    gl.compileShader(shader);
    // シェーダが正しくコンパイルされたかチェック
    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
      // 成功していたらシェーダを返して終了
      return shader;
    }else{
      // 失敗していたらエラーログをアラートする
      alert(gl.getShaderInfoLog(shader));
    }
  }

  /**
   * WebGLProgram生成
   * @param {WebGLRenderingContext} gl 
   * @param {WebGLShader} vs VertexShader
   * @param {WebGLShader} fs FragmentShader
   * @returns {WebGLProgram} 
   */
  static createProgram(gl, vs, fs){
    // プログラムオブジェクトの生成
    var program = gl.createProgram();
    // プログラムオブジェクトにシェーダを割り当てる
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    // シェーダをリンク
    gl.linkProgram(program);
    // シェーダのリンクが正しく行なわれたかチェック
    if(gl.getProgramParameter(program, gl.LINK_STATUS)){
      // 成功していたらプログラムオブジェクトを有効にする
      gl.useProgram(program);
      // プログラムオブジェクトを返して終了
      return program;
    }else{
      // 失敗していたらエラーログをアラートする
      alert(gl.getProgramInfoLog(program));
    }
  }

  /**
   * VBO生成
   * @param {WebGLRenderingContext} gl
   * @param {array} data 
   * @returns {WebGLBuffer}
   */
  static createVBO(gl, data){
    // バッファオブジェクトの生成
    var vbo = gl.createBuffer();
    // バッファをバインドする
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    // バッファにデータをセット
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    // バッファのバインドを無効化
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    // 生成した VBO を返して終了
    return vbo;
  }

  /**
   * IBO生成
   * @param {WebGLRenderingContext} gl
   * @param {array} data
   * @returns {WebGLBuffer}
   */
  static createIBO(gl, data) {
    // バッファオブジェクトの生成
    var ibo = gl.createBuffer();
    // バッファをバインドする
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    // バッファにデータをセット
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
    // バッファのバインドを無効化
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    // 生成した IBO を返して終了
    return ibo;
  }
}