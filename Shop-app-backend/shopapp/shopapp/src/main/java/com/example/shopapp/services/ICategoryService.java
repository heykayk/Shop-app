package com.example.shopapp.services;

import com.example.shopapp.models.Category;

import java.util.List;

public interface ICategoryService {
    Category createCategory(Category category);
    Category getCategoryById(Long id);
    List<Category> getAllCategories();
    Category updateCategory(Long categoryId,Category category);
    void deleteCategory(Long id);
}
