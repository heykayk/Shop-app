package com.example.shopapp.services;

import com.example.shopapp.models.Category;
import com.example.shopapp.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService{
    @Autowired
    private final CategoryRepository categoryRepository;

    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category updateCategory(Long categoryId, Category category) {
        Category existingCategory = getCategoryById(categoryId);
        existingCategory.setName(category.getName());
        return existingCategory;
    }
    
    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
