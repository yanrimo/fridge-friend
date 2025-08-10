"use client";

import { FormEvent, useState } from "react";

type FoodItem = {
  id: string;
  name: string;
  category: string;
  expiryDate: string;
  quantity: number;
};

export default function Home() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [editingId, setEditingId] = useState<FoodItem["id"]>("");
  const [editingName, setEditingName] = useState<FoodItem["name"]>("");
  const [editingCategory, setEditingCategory] =
    useState<FoodItem["category"]>("");
  const [editingQuantity, setEditingQuantity] =
    useState<FoodItem["quantity"]>(0);
  const [editingExpiryDate, setEditingExpiryDate] =
    useState<FoodItem["expiryDate"]>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEdit) {
      const currentFoodItems = foods.filter((food) => food.id !== editingId);
      const newFoodItem: FoodItem = {
        id: editingId,
        name: editingName,
        category: editingCategory,
        quantity: editingQuantity,
        expiryDate: editingExpiryDate,
      };
      setFoods([...currentFoodItems, newFoodItem]);
    } else {
      const newFoodItem: FoodItem = {
        id: crypto.randomUUID(),
        name: editingName,
        category: editingCategory,
        quantity: Number(editingQuantity),
        expiryDate: editingExpiryDate,
      };
      setFoods([...foods, newFoodItem]);
    }

    resetForm();
  };

  const deleteFoodItem = (foodItemId: FoodItem["id"]) => {
    setFoods(foods.filter((food) => food.id !== foodItemId));
  };

  const editFoodItem = (foodItem: FoodItem) => {
    setIsEdit(true);
    setEditingId(foodItem.id);
    setEditingName(foodItem.name);
    setEditingCategory(foodItem.category);
    setEditingQuantity(foodItem.quantity);
    setEditingExpiryDate(foodItem.expiryDate);
  };

  const resetForm = () => {
    setEditingId("");
    setEditingName("");
    setEditingCategory("");
    setEditingQuantity(0);
    setEditingExpiryDate("");
    setIsEdit(false);
  };

  return (
    <div>
      <div>
        <h2>食材追加フォーム</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            value={editingName}
            onChange={(e) => setEditingName(e.target.value)}
          />
          <input
            type="text"
            name="category"
            id="category"
            value={editingCategory}
            onChange={(e) => setEditingCategory(e.target.value)}
          />
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={editingQuantity}
            onChange={(e) => setEditingQuantity(Number(e.target.value))}
          />
          <input
            type="date"
            name="expiryDate"
            id="expiryDate"
            value={editingExpiryDate}
            onChange={(e) => setEditingExpiryDate(e.target.value)}
          />
          <button type="submit">追加</button>
        </form>
      </div>
      <div>
        <h2>食材一覧</h2>
        <ul>
          {foods.map((food) => (
            <li key={food.id}>
              <p>{food.name}</p>
              <button onClick={() => editFoodItem(food)}>edit</button>
              <button onClick={() => deleteFoodItem(food.id)}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
