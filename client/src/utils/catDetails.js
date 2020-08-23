export function catDetails(name, nickName, clicks, image, catStats) {
  const updatedCat = {};

  if (name !== "") {
    updatedCat.name = name;
  } else updatedCat.name = catStats.name;
  if (nickName !== "") {
    updatedCat.nickName = nickName;
  } else updatedCat.nickName = catStats.nickName;
  if (clicks !== 0) {
    updatedCat.clicks = clicks;
  } else updatedCat.clicks = catStats.clicks;
  if (image !== "") {
    updatedCat.image = image;
  } else updatedCat.image = catStats.image;

  return updatedCat;
}

export function catAge(clicks) {
  if (clicks <= 5) {
    return "Infant";
  } else if (clicks >= 6 && clicks < 13) {
    return "Child";
  } else if (clicks >= 13 && clicks < 25) {
    return "Young";
  } else if (clicks >= 25 && clicks < 40) {
    return "Middle-Age";
  } else if (clicks >= 40 && clicks < 60) {
    return "Very old";
  } else {
    return "Dead";
  }
}
