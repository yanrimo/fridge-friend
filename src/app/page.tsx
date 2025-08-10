"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type FoodItem = {
  id: string;
  name: string;
  category: string;
  expiryDate: string;
  quantity: number;
};

export default function Home() {
  const [foods, setFoods] = useState<FoodItem[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FoodItem>({
    defaultValues: {
      name: "",
      category: "",
      quantity: 0,
      expiryDate: "",
    },
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const onFormSubmit = (data: FoodItem) => {
    if (editingId) {
      const currentFoodItems = foods.filter((food) => food.id !== editingId);
      const updatedFoodItem: FoodItem = {
        ...data,
        id: editingId,
      };
      setFoods([...currentFoodItems, updatedFoodItem]);
    } else {
      const newFoodItem: FoodItem = {
        ...data,
        id: crypto.randomUUID(),
      };
      setFoods([...foods, newFoodItem]);
    }

    reset({
      name: "",
      category: "",
      quantity: 0,
      expiryDate: "",
    });
    setEditingId(null);
  };

  const deleteFoodItem = (foodItemId: FoodItem["id"]) => {
    setFoods(foods.filter((food) => food.id !== foodItemId));
  };

  const editFoodItem = (foodItem: FoodItem) => {
    reset({
      name: foodItem.name,
      category: foodItem.category,
      quantity: foodItem.quantity,
      expiryDate: foodItem.expiryDate,
    });
    setEditingId(foodItem.id);
  };

  return (
    <div>
      <div>
        <h2>食材追加フォーム</h2>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <input
            type="text"
            {...register("name", { required: "名前は必須です" })}
          />
          {errors.name && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}
          <input
            type="text"
            {...register("category", { required: "カテゴリは必須です" })}
          />
          <input
            type="number"
            {...register("quantity", {
              required: "数量は必須です",
              valueAsNumber: true,
            })}
          />
          <input
            type="date"
            {...register("expiryDate", { required: "賞味期限は必須です" })}
          />
          <button type="submit">
            {isSubmitting ? "送信中..." : editingId ? "更新" : "追加"}
          </button>
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
