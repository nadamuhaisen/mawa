import "../Styles/ListingForm.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getListingById,
  updateListing
} from "../services/listingService.js";

export default function EditListing() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    type: "شقق",
    location: "",
    price: "",
    priceUnit: "شهر",
    description: "",
    images: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadListing() {
      try {
        const data = await getListingById(id);

        setForm({
          title: data.title || "",
          type: data.type || "شقق",
          location: data.location || "",
          price: data.price || "",
          priceUnit: data.priceUnit || "شهر",
          description: data.description || "",
          images: data.images?.[0] || ""
        });

      } catch (err) {
        setError("حدث خطأ في جلب بيانات العقار");

      } finally {
        setLoading(false);
      }
    }

    loadListing();

  }, [id]);

  function updateField(field, value) {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      await updateListing(
        id,
        {
          ...form,

          price: Number(form.price),

          images: form.images
            ? [form.images]
            : []
        }
      );

      navigate("/owner/listings");

    } catch (err) {
      setError(
        "حدث خطأ أثناء تعديل العقار"
      );

    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <p>
        جاري تحميل بيانات العقار...
      </p>
    );
  }

  return (
    <div className="listing-form-page">

      <div className="listing-form">

        <div className="back-wrapper">

          <button
            type="button"
            onClick={() => navigate(-1)}
          >
            رجوع
          </button>

        </div>

        <h2>
          تعديل العقار
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
          />

          <div className="listing-form-group">

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

          </div>

          <div className="listing-form-group">

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
            />

          </div>

          <div className="listing-form-group">

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
            />

          </div>

          <div className="listing-form-group">

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

          </div>

          <div className="listing-form-group">

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
            />

          </div>

          <div className="listing-form-group">

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

          </div>

          {
            error &&
            <p className="error-message">
              {error}
            </p>
          }

          <div className="listing-form-actions">

            <button
              type="button"
              className="listing-back-btn"
              onClick={() => navigate(-1)}
            >
              رجوع
            </button>

            <button
              type="submit"
              className="listing-submit-btn"
              disabled={saving}
            >
              {
                saving
                  ? "جاري الحفظ..."
                  : "حفظ التعديل"
              }
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}