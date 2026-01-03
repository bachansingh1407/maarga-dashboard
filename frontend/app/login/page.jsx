"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaLock, FaPhoneAlt } from "react-icons/fa";

/* ------------------ Validation Schema ------------------ */
const LoginSchema = Yup.object().shape({
    phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    secret: Yup.string()
        .required("Secret code is required")
        .min(4, "Secret code must be at least 4 characters"),
});

export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9] px-4">
            <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8">

                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Welcome back
                    </h1>
                    <p className="text-sm text-gray-500">
                        This space is private. Please verify yourself.
                    </p>
                </div>

                {/* Form */}
                <Formik
                    initialValues={{ phone: "", secret: "" }}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                        console.log("Login Data:", values);
                        // NEXT:
                        // → Send OTP
                    }}
                >
                    {({ isValid, dirty, errors, touched }) => (
                        <Form className="space-y-6">

                            {/* Phone Number */}
                            <div className="space-y-1">
                                <label className="text-sm text-gray-600">
                                    Phone number
                                </label>

                                <div
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 border transition
                                            ${errors.phone && touched.phone
                                            ? "border-red-500"
                                            : "border-gray-200 focus-within:border-gray-400"
                                        }
                                        `}
                                >
                                    <FaPhoneAlt
                                        className={
                                            errors.phone && touched.phone
                                                ? "text-red-500"
                                                : "text-gray-400"
                                        }
                                    />
                                    <Field
                                        name="phone"
                                        type="tel"
                                        placeholder="Enter phone number"
                                        className="flex-1 bg-transparent focus:outline-none text-gray-800"
                                    />
                                </div>

                                <ErrorMessage
                                    name="phone"
                                    component="p"
                                    className="text-xs text-red-500 font-medium"
                                />
                            </div>

                            {/* Secret Code */}
                            <div className="space-y-1">
                                <label className="text-sm text-gray-600">
                                    Secret code
                                </label>

                                <div
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 border transition
                    ${errors.secret && touched.secret
                                            ? "border-red-500"
                                            : "border-gray-200 focus-within:border-gray-400"
                                        }
                  `}
                                >
                                    <FaLock
                                        className={
                                            errors.secret && touched.secret
                                                ? "text-red-500"
                                                : "text-gray-400"
                                        }
                                    />
                                    <Field
                                        name="secret"
                                        type="password"
                                        placeholder="Your private code"
                                        className="flex-1 bg-transparent focus:outline-none text-gray-800"
                                    />
                                </div>

                                <ErrorMessage
                                    name="secret"
                                    component="p"
                                    className="text-xs text-red-500 font-medium"
                                />

                                <p className="text-xs text-gray-400">
                                    This helps confirm it’s really you.
                                </p>
                            </div>

                            {/* Continue Button */}
                            <button
                                type="submit"
                                disabled={!(isValid && dirty)}
                                className={`w-full py-3 rounded-xl font-medium transition border border-slate-300 outline-0
                  ${isValid && dirty
                                        ? "bg-slate-600 text-white hover:bg-gray-800"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    }
                `}
                            >
                                Continue
                            </button>

                        </Form>
                    )}
                </Formik>

                {/* Footer */}
                <div className="text-center text-xs text-slate-600 font-medium">
                    Maarga · Your private journey
                </div>

            </div>
        </div>
    );
}
