import "../component/navbar.js";
import "../component/menu.js";
import "../component/content.js";
import "../component/meal_list.js";
import "../component/meal_card.js";
import "../component/meal_detail.js";
import "../component/error_message.js";
import { MealService } from "../service/meal_service.js";

export const main = () => {
  const mainContent = document.getElementById("main-content");
  const mainMenu = document.querySelector("app-menu");
  const navbar = document.querySelector("app-navbar");
  const appContentElement = document.createElement("app-content");
  const mealListElement = document.createElement("meal-list");
  const mealDetailElement = document.createElement("meal-detail");
  const errorMessage = document.createElement("error-message");

  // test
  mainContent.appendChild(appContentElement);

  const renderMealList = (mealData) => {
    if (appContentElement.contains(errorMessage)) {
      appContentElement.removeElement(errorMessage);
    }

    if (appContentElement.contains(mealListElement)) {
      appContentElement.clearMealList();
    }
    mealListElement.meals = mealData;
    mealListElement.setAttribute("class", "columns is-multiline");
    appContentElement.appendChild(mealListElement);
  };

  const renderError = () => {
    if (appContentElement.contains(errorMessage)) {
      appContentElement.removeElement(errorMessage);
    }

    if (appContentElement.contains(mealListElement)) {
      appContentElement.clearMealList();
    }

    appContentElement.appendChild(errorMessage);
  };

  const renderContent = async (event) => {
    event.preventDefault();
    mainContent.replaceChild(appContentElement, mealDetailElement);
    await getMealCategory(event.target.textContent);
  };

  const renderDetail = (meal) => {
    appContentElement.clearMealList();
    mealDetailElement.meal = meal;
    mainContent.replaceChild(mealDetailElement, appContentElement);
  };

  const getMealCategory = async (category) => {
    if (mainContent.contains(mealDetailElement)) {
      mainContent.replaceChild(appContentElement, mealDetailElement);
    }

    try {
      const mealCategory = await MealService.filterByCategory(category);
      renderMealList(mealCategory);
    } catch (err) {
      renderError();
    }
  };

  const getMealDetail = async (mealId) => {
    try {
      const meal = await MealService.getMealDetail(mealId);
      renderDetail(meal);
    } catch (err) {
      renderError();
    }
  };

  const getMealByName = async (mealName) => {
    if (mainContent.contains(mealDetailElement)) {
      mainContent.replaceChild(appContentElement, mealDetailElement);
    }

    try {
      const meals = await MealService.searchMealByName(mealName);
      renderMealList(meals);
    } catch (err) {
      renderError();
    }
  };

  navbar.searchMeal.on("searchValue", getMealByName);

  mainMenu.mealCategory.on("meal", getMealCategory);

  if (mealListElement) {
    mealListElement.mealId = getMealDetail;
  }

  if (mealDetailElement) {
    mealDetailElement.goBackEvent = renderContent;
  }
};
