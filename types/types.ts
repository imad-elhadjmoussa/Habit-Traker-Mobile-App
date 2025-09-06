export type ResponseStatus = {
    success: boolean;
    message: string;
};

export type Frequency = "Daily" | "Weekly" | "Monthly";

export type ToastType = {
    type: "success" | "error";
    message: string;
};