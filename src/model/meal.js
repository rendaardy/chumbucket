import querystring from "querystring";

function mapIngredients(jsonData) {
  const props = Object.entries(jsonData);
  const data = props
    .filter(
      ([prop, val]) =>
        prop.includes("strIngredient") && val !== "" && val !== null
    )
    .map(([_, val]) => val);
  return data;
}

function mapMeasures(jsonData) {
  const props = Object.entries(jsonData);
  const data = props
    .filter(
      ([prop, val]) => prop.includes("strMeasure") && val !== "" && val !== null
    )
    .map(([_, val]) => val);
  return data;
}

/**
 *
 * @param {string} url
 * @returns {string}
 */
function getYoutubeId(url) {
  if (url === undefined) {
    return "";
  }
  const parsedUrl = querystring.parse(url.substring(url.indexOf("?") + 1));
  return String(parsedUrl.v);
}

export class Meal {
  /**
   *
   * @param {string} id
   * @param {string} name
   * @param {string} category
   * @param {string} instructions
   * @param {string} thumbnail
   * @param {string[]} ingredients
   * @param {string[]} measures
   * @param {string} youtubeId
   */
  constructor(
    id,
    name,
    category,
    instructions,
    thumbnail,
    ingredients,
    measures,
    youtubeId
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.instructions = instructions;
    this.thumbnail = thumbnail;
    this.ingredients = ingredients;
    this.measures = measures;
    this.youtubeId = youtubeId;
  }

  static fromJson(jsonData) {
    return new Meal(
      jsonData.idMeal,
      jsonData.strMeal,
      jsonData.strCategory,
      jsonData.strInstructions,
      jsonData.strMealThumb,
      mapIngredients(jsonData),
      mapMeasures(jsonData),
      getYoutubeId(jsonData.strYoutube)
    );
  }
}
