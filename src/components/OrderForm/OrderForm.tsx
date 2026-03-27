import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrder } from "../../api/ordersApi";
import { useCart } from "../../hooks/useCart";
import type { CreateOrderDto } from "../../types/order";
import type { CartItem } from "../../context/CartContext";
import css from "./OrderForm.module.css"; 

interface Props {
  cart: CartItem[];
}

interface OrderFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const schema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(25, "Name cannot exceed 25 characters")
    .matches(
      /^[A-Za-zА-Яа-яІіЇїЄє]+([ '-][A-Za-zА-Яа-яІіЇїЄє]+)*$/,
      "The name may contain only letters, spaces, hyphens, or apostrophes."
    )
    .required("Name is required"),

  email: Yup.string()
    .trim()
    .lowercase()
    .email("Invalid email")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^\+?[1-9]\d{7,14}$/, "Invalid phone number format")
    .required("Phone is required"),

  address: Yup.string()
    .trim()
    .min(3, "Address must be at least 3 characters")
    .max(100, "Address cannot exceed 100 characters")
    .required("Address is required"),
});

const defaultValues: OrderFormValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

export default function OrderForm({ cart }: Props) {
  const { clearCart } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Order created!");
      clearCart();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (data: OrderFormValues) => {
    if (!cart.length) {
      toast.error("Cart is empty");
      return;
    }

    const products: CreateOrderDto["products"] = cart.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    mutation.mutate({ ...data, products });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.inputWrapper}>
        <input
          placeholder="Name"
          {...register("name")}
          className={errors.name ? css.inputError : ""}
        />
        {errors.name && <p className={css.error}>{errors.name.message}</p>}
      </div>

      <div className={css.inputWrapper}>
        <input
          placeholder="Email"
          {...register("email")}
          className={errors.email ? css.inputError : ""}
        />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
      </div>

      <div className={css.inputWrapper}>
        <input
          placeholder="Phone"
          {...register("phone")}
          className={errors.phone ? css.inputError : ""}
        />
        {errors.phone && <p className={css.error}>{errors.phone.message}</p>}
      </div>

      <div className={css.inputWrapper}>
        <input
          placeholder="Address"
          {...register("address")}
          className={errors.address ? css.inputError : ""}
        />
        {errors.address && <p className={css.error}>{errors.address.message}</p>}
      </div>

      <button
        type="submit"
        className={css.submitButton}
        disabled={isSubmitting || mutation.isPending || !cart.length}
      >
        {isSubmitting || mutation.isPending ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}