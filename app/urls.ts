import { BoxGeometry, MeshBasicMaterial, Mesh, TextureLoader, SRGBColorSpace } from "three";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from "./constants";

const textureLoader = new TextureLoader();

export const createImageMesh = async (uri: string) => {
  const geometry = new BoxGeometry(IMAGE_WIDTH, IMAGE_HEIGHT, 0);
  const material = new MeshBasicMaterial();
  const songCover = new Mesh(geometry, material);

  const texture = await textureLoader.loadAsync(uri);
  texture.needsUpdate = true;
  texture.colorSpace = SRGBColorSpace;

  songCover.material.map = texture;
  songCover.scale.set(1.0, 1, 1.0);

  const imageAspect = texture.image.width / texture.image.height;
  const boxAspect = IMAGE_WIDTH / IMAGE_HEIGHT;

  // if (boxAspect < imageAspect) {
  //   texture.matrix.setUvTransform(0, 0, boxAspect / imageAspect, 1, 0, 0.5, 0.5);
  // } else {
  //   texture.matrix.setUvTransform( 0, 0, 1, imageAspect / boxAspect, 0, 0.5, 0.5 );
  // }

  return songCover;
}

export const images = [
  "https://pbs.twimg.com/media/GUrlgwhXsAASMRE?format=jpg&name=large",
  "https://pbs.twimg.com/media/GT3pfPDbwAEQycf?format=jpg&name=large",
  "https://pbs.twimg.com/media/GTrYfJIaQAE-Yrp?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GRnd-mWXcAAZOhS?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GQ4V235XIAAzAh7?format=jpg&name=4096x4096",
  "https://pbs.twimg.com/media/GUnYNYEW8AAaWrY?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GUXybnmWcAAWhFU?format=jpg&name=large",
  "https://pbs.twimg.com/media/GSwGPGRasAAgLQ0?format=jpg&name=4096x4096"
]
