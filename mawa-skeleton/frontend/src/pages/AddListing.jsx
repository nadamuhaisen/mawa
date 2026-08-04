import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createListing } from "../services/listingService.js";

import "../Styles/ListingForm.css";

import BackButton from "../components/BackButton";

export default function AddListing() {
  const [form, setForm] = useState({
    title: "",
    type: "",
    location: "",
    price: "",
    priceUnit: "شهر",
    description: "",
    images: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function updateField(fieldName, value) {
    setForm((prev) => ({
      ...prev,
      [fieldName]: value
    }));
  }

  function validate() {
    if (!form.title.trim()) {
      return "اسم/عنوان العقار مطلوب";
    }

    if (!form.location.trim()) {
      return "منطقة العقار مطلوبة";
    }

    if (!form.price || Number(form.price) <= 0) {
      return "السعر لازم يكون رقم أكبر من صفر";
    }

    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      await createListing({
        ...form,

        images: form.images
          ? [form.images]
          : []
      });

      navigate("/owner/dashboard");

    } catch (err) {
      console.log(err);

      setError(
        "صار خطأ بإضافة العقار، حاولي تاني"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="listing-form-page">
      <div className="listing-form">

        <div className="back-wrapper">
          <BackButton />
        </div>

        <h2>
          إضافة عقار جديد
        </h2>

        <form onSubmit={handleSubmit}>

          <label>
            عنوان العقار
          </label>

          <input
            value={form.title}
            onChange={(e) =>
              updateField(
                "title",
                e.target.value
              )
            }
            placeholder="مثال: شقة غرفتين"
          />

          <label>
            نوع العقار
          </label>

          <select
            value={form.type}
            onChange={(e) =>
              updateField(
                "type",
                e.target.value
              )
            }
          >
            <option value="شقق">
              شقق
            </option>

            <option value="محلات">
              محلات
            </option>

            <option value="صالات افراح">
              صالات افراح
            </option>

            <option value="قطع اراضي">
              قطع اراضي
            </option>
          </select>

          <label>
            المنطقة
          </label>

          <input
            value={form.location}
            onChange={(e) =>
              updateField(
                "location",
                e.target.value
              )
            }
            placeholder="مثال: دير البلح"
          />

          <label>
            السعر
          </label>

          <input
            type="number"
            value={form.price}
            onChange={(e) =>
              updateField(
                "price",
                e.target.value
              )
            }
            placeholder="مثال: 150"
          />

          <label>
            وحدة السعر
          </label>

          <select
            value={form.priceUnit}
            onChange={(e) =>
              updateField(
                "priceUnit",
                e.target.value
              )
            }
          >
            <option value="شهر">
              شهر
            </option>

            <option value="مناسبة">
              مناسبة
            </option>
          </select>

          <label>
            الوصف
          </label>

          <textarea
            value={form.description}
            onChange={(e) =>
              updateField(
                "description",
                e.target.value
              )
            }
            placeholder="وصف مختصر عن العقار..."
          />

          <label>
            صورة العقار
          </label>

          <input
            type="text"
            placeholder="ضع رابط الصورة"
            value={form.images}
            onChange={(e) =>
              updateField(
                "images",
                e.target.value
              )
            }
          />

          {
            error && (
              <p className="error-message">
                {error}
              </p>
            )
          }

          <button
            type="submit"
            disabled={loading}
          >
            {
              loading
                ? "جاري الإضافة..."
                : "إضافة العقار"
            }
          </button>

        </form>
      </div>
    </div>
  );
}