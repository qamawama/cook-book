package com.qama.cookBook.recipe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public Recipe createRecipe(RecipeRequest request, Long userId) {
        Recipe recipe = new Recipe();
        recipe.setTitle(request.getTitle());
        recipe.setDescription(request.getDescription());
        recipe.setCategory(request.getCategory());
        recipe.setIngredients(request.getIngredients());
        recipe.setInstructions(request.getInstructions());
        recipe.setCreatedAt(LocalDateTime.now());
        recipe.setUserId(userId);

        return recipeRepository.save(recipe);
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe getRecipeById(Long id) {
        return recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id: " + id));
    }

    public List<Recipe> getRecipeByUserId(Long userId){
        return recipeRepository.findByUserId(userId);
    }

    public Recipe updateRecipe(Long id, RecipeRequest request, Long userId) {
        Recipe recipe = getRecipeById(id);

        if (!recipe.getUserId().equals(userId)) {
            throw new RuntimeException("You don't have permission to update this recipe");
        }

        recipe.setTitle(request.getTitle());
        recipe.setDescription(request.getDescription());
        recipe.setCategory(request.getCategory());
        recipe.setIngredients(request.getIngredients());
        recipe.setInstructions(request.getInstructions());
        recipe.setUpdatedAt(LocalDateTime.now());

        return recipeRepository.save(recipe);
    }

    public void deleteRecipe(Long id, Long userId) {
        Recipe recipe = getRecipeById(id);

        if (!recipe.getUserId().equals(userId)) {
            throw new RuntimeException("You don't have permission to delete this recipe");
        }

        recipeRepository.delete(recipe);

    }

}
