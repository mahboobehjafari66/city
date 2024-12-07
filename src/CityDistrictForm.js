import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    city: yup.string().required('شهر اجباری است'),
    district: yup.string().required('شهرستان اجباری است'),
});

const CityDistrictForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [cities, setCities] = useState({});
    const [loading, setLoading] = useState(true);
    const selectedCity = watch('city');

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await import('./cities.json'); // بارگذاری فایل JSON
                setCities(response.cities);
            } catch (error) {
                console.error('Error fetching cities:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCities(); // فراخوانی تابع fetchCities
    }, []);

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 mx-auto text-right my-10">
            <div>
                <label htmlFor="city" className="block mb-2">شهر:</label>
                <select id="city" {...register('city')} className="border p-2 mb-3 text-right bg-pink-100 w-full">
                    <option value="">یک مورد را انتخاب کنید  </option>
                    {cities && Object.keys(cities).length > 0 && Object.keys(cities).map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
                {errors.city && <p className="text-red-500">{errors.city.message}</p>}
            </div>

            <div>
                <label htmlFor="district" className="block mb-2 ">شهرستان:</label>
                <select id="district" {...register('district')} className="border p-2 mb-3 text-right bg-pink-100 w-full" disabled={!selectedCity}>
                    <option value="">یک مورد را انتخاب کنید </option>
                    {selectedCity && cities[selectedCity]?.map((district) => (
                        <option key={district} value={district}>{district}</option>
                    ))}
                </select>
                {errors.district && <p className="text-red-500">{errors.district.message}</p>}
            </div>

            <button type="submit" className="bg-pink-500 text-white p-3  rounded">ارسال</button>
            {loading && <p>در حال بارگذاری...</p>}
        </form>
    );
};

export default CityDistrictForm;






