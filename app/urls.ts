import { BoxGeometry, MeshBasicMaterial, Mesh, TextureLoader, SRGBColorSpace } from "three";

const textureLoader = new TextureLoader();

export const createImageMesh = async (uri: string) => {
  const geometry = new BoxGeometry(6, 3, 0);
  const material = new MeshBasicMaterial();
  const songCover = new Mesh(geometry, material);

  const texture = await textureLoader.loadAsync(uri);
  texture.colorSpace = SRGBColorSpace;
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
