import { BoxGeometry, MeshBasicMaterial, Mesh, TextureLoader, SRGBColorSpace, NearestFilter, Texture } from "three";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from "./constants";

const textureLoader = new TextureLoader();

function cover(texture: Texture, aspect: number) {
  const imageAspect = texture.image.width / texture.image.height;

  if (aspect < imageAspect) {
    texture.matrix.setUvTransform(0, 0, aspect / imageAspect, 1, 0, 0.5, 0.5);
  } else {
    texture.matrix.setUvTransform(0, 0, 1, imageAspect / aspect, 0, 0.5, 0.5);
  }
}

export const createImageMesh = async (uri: string) => {
  const geometry = new BoxGeometry(IMAGE_WIDTH, IMAGE_HEIGHT, 0);
  const material = new MeshBasicMaterial();
  const songCover = new Mesh(geometry, material);

  const texture = await textureLoader.loadAsync(uri);

  texture.needsUpdate = true;
  texture.matrixAutoUpdate = false;
  texture.colorSpace = SRGBColorSpace;

  cover(texture, IMAGE_WIDTH / IMAGE_HEIGHT)
  songCover.material.map = texture;

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
