import Customer from "../schemas/customerSchema.js";

export const addCustomerRepository = async (customerData) => {
    try {
        const customer = await Customer.create(customerData);
        return customer;
    } catch (error) {
        console.log("Error in addCustomerRepository:", error);
        throw new Error("Could not add customer due to " + error);
    }
}

export const updateCustomerRepository = async (customerId, updatedData) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(customerId, updatedData, { new: true });

        return updatedCustomer;
    } catch (error) {
        console.log("Error in updateCustomerRepository:", error);
        throw new Error("Could not update customer due to " + error);
    }
}

export const getCustomerByIdRepository = async (customerId) => {
    try {
        const customer = await Customer.findById(customerId).populate('orderIds');
        return customer;
    } catch (error) {
        console.log("Error in getCustomerByIdRepository:", error);
        throw new Error("Could not fetch customer due to " + error);
    }
}

export const getCustomerByPhoneRepository = async (customerPhone) => {
    try {
        const customer = await Customer.findOne({ customerPhone: customerPhone }).populate('orderIds');
        return customer;
    } catch (error) {
        console.log("Error in getCustomerByPhoneRepository:", error);
        throw new Error("Could not fetch customer due to " + error);
    }
}