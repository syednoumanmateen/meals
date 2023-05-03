import React, { useEffect, useState } from 'react'
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {

    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        setIsLoading(true)
        const fetchMeals = async () => {
            const res = await fetch('https://meals-fa02e-default-rtdb.firebaseio.com/meals.json')

            if (!res.ok) {
                throw new Error('Something is wrong')
            }

            const data = await res.json()

            const loadedMeals = []

            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price
                })
            }
            setMeals(loadedMeals)
            setIsLoading(false)
        }

        fetchMeals().catch(err => {
            setError(err.message)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return <section className={classes.mealsLoading}><p>Loading...</p></section>
    }

    if (error) {
        return <section className={classes.mealsError}><p>{error}</p></section>

    }

    const mealsList = meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />)

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals
