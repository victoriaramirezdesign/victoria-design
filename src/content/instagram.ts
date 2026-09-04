// Piezas destacadas de Instagram que se muestran en la home.
// TODO(contenido): descargar las imagenes de los posts que quieran destacar,
// ponerlas en public/instagram/ y pegar aca la ruta + el link al post.
// Si el array queda vacio, la seccion muestra solo el CTA para seguirlos.
//
// Nota: un feed 100% automatico requiere la API de Instagram (token de Meta
// que caduca cada 60 dias). Esta version manual es mas estable y no depende
// de que Meta apruebe la app.

export type InstagramTile = {
  /** Ruta en /public/instagram/ */
  image: string;
  /** Link al post concreto */
  href: string;
  alt: string;
};

export const instagramTiles: InstagramTile[] = [];
