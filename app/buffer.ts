import { Box3, Group, Vector3 } from "three";
import { createImageMesh, images } from "./urls";
import { MAX_PER_LINE, IMAGE_WIDTH, IMAGE_HEIGHT } from "./constants";

export const getLastGroupFromBuffer = (groups: Group[]) => {
  const lastGroup = groups.at(-1);
  if (!lastGroup) return;

  const box = new Box3().setFromObject(lastGroup);
  const size = new Vector3();

  box.getSize(size);

  return {
    size,
    group: lastGroup,
  };
}

export const createGroupBuffer = async () => {
  const groups = [new Group()];

  const filledArray = fillArray(images, 60);
  const cubes = await Promise.all(
    filledArray.map((image) => createImageMesh(image))
  );

  const offsetInitial = -((MAX_PER_LINE / 2) * IMAGE_WIDTH) + IMAGE_WIDTH / 2;
  const lineCount = Math.ceil(images.length / MAX_PER_LINE);

  let offsetx = offsetInitial;
  let offsety = (lineCount * IMAGE_HEIGHT) / 2 - IMAGE_HEIGHT / 2;

  const group = groups.at(0);
  for (let index = 0; index < cubes.length; index++) {
    const cube = cubes[index];
    if (!cube) continue;

    group!.add(cube);

    cube.position.x = offsetx;
    cube.position.y = offsety;

    offsetx += IMAGE_WIDTH;

    if (index > 0 && (index + 1) % MAX_PER_LINE === 0) {
      offsety -= IMAGE_HEIGHT;
      offsetx = offsetInitial;
    }
  }

  return groups;
}

export const intersectsWithLastGroup = (groups: Group[], currentPosition: number) => {
  const result = getLastGroupFromBuffer(groups);
  if (!result) return false;

  const groupEndPoint = result.size.x + result.group.position.x - result.size.x / 2;
  
  return currentPosition > groupEndPoint - (result.size.x / 2);
}
