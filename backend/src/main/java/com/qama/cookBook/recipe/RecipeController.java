package com.qama.cookBook.recipe;

import com.qama.cookBook.security.JwtAuthenticationHelper;
import com.qama.cookBook.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/recipes")
@CrossOrigin(origins = "*")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private JwtAuthenticationHelper jwtAuthenticationHelper;

    @PostMapping("/create")
    public ResponseEntity<?> createRecipe(
            @RequestBody RecipeRequest request,
            @RequestHeader("Authorization") String authHeader) {
        try {
            User user = jwtAuthenticationHelper.getUserFromToken(authHeader);
            Recipe recipe = recipeService.createRecipe(request, user.getId());
            return ResponseEntity.ok(recipe);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        List<Recipe> recipes = recipeService.getAllRecipes();
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRecipeById(@PathVariable Long id) {
        try {
            Recipe recipe = recipeService.getRecipeById(id);
            return ResponseEntity.ok(recipe);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/my-recipes")
    public ResponseEntity<List<Recipe>> getRecipeByUserId (
            @RequestHeader("Authorization") String authHeader) {
        try {
            User user = jwtAuthenticationHelper.getUserFromToken(authHeader);
            List<Recipe> recipes = recipeService.getRecipeByUserId(user.getId());
            return ResponseEntity.ok(recipes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRecipe(
            @PathVariable Long id,
            @RequestBody RecipeRequest request,
            @RequestHeader("Authorization") String authHeader) {
        try {
            User user = jwtAuthenticationHelper.getUserFromToken(authHeader);
            Recipe recipe = recipeService.updateRecipe(id, request, user.getId());
            return ResponseEntity.ok(recipe);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecipe(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader) {
        try {
            User user = jwtAuthenticationHelper.getUserFromToken(authHeader);
            recipeService.deleteRecipe(id, user.getId());
            return ResponseEntity.ok("Recipe deleted successfully");
    } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
