import { Meal } from "../model/meal.js";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

export class MealService {
  /**
   *
   * @param {string} category
   * @returns {Promise<Meal[]>}
   */
  static async filterByCategory(category) {
    const response = await fetch(`${BASE_URL}filter.php?c=${category}`);
    const jsonData = await response.json();
    const meals = jsonData.meals.map((meal) => Meal.fromJson(meal));
    return meals;
  }

  /**
   *
   * @param {string} id
   * @returns {Promise<Meal>}
   */
  static async getMealDetail(id) {
    const response = await fetch(`${BASE_URL}lookup.php?i=${id}`);
    const jsonData = await response.json();
    const meal = Meal.fromJson(jsonData.meals[0]);
    return meal;
  }

  /**
   *
   * @param {string} name
   * @returns {Promise<Meal[]>}
   */
  static async searchMealByName(name) {
    const response = await fetch(`${BASE_URL}search.php?s=${name}`);
    const jsonData = await response.json();
    const meals = jsonData.meals.map((meal) => Meal.fromJson(meal));
    return meals;
  }
}
