import { Component, OnInit } from '@angular/core'

import moment from 'moment'

import data from '../../assets/50_Mile_-_100K_Training_Plan_Level_3.json'

const localStorageStartDateKey = 'running-calendar_start-date'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: []
})
export class HomePageComponent implements OnInit {
  days!: any[]

  startDate: Date
  endDate!: Date
  today: moment.Moment
  locked: boolean

  constructor () {
    this.today = moment()
    this.locked = true

    const savedStartDate = window.localStorage.getItem(localStorageStartDateKey)
    if (savedStartDate) {
      this.startDate = new Date(savedStartDate)
    } else {
      this.startDate = new Date()
      window.localStorage.setItem(localStorageStartDateKey, this.startDate.toISOString())
    }
  }

  ngOnInit (): void {
    this.processPlan()

    setTimeout(() => {
      const todayEl = document.querySelector('.is-today')
      if (todayEl) {
        todayEl.scrollIntoView({ behavior: 'auto' })
      }
    }, 500)
  }

  onStartDateChange (ev: Date) {
    this.startDate = new Date(ev)
    window.localStorage.setItem(localStorageStartDateKey, this.startDate.toISOString())

    this.locked = true

    this.processPlan()
  }

  getDayClass (day: any) {
    const workoutDate = moment(day.workout_date)
    return {
      'is-past': workoutDate.isBefore(this.today, 'day'),
      'is-today': this.today.isSame(workoutDate, 'day'),
      'is-type-recovery': day.name.includes('Recovery Day'),
    }
  }

  private processPlan () {
    const planData = data.data
    const numberOfWeeks = planData[0].plan_instance_info.number_of_weeks

    this.endDate = moment(this.startDate).add(numberOfWeeks, 'weeks').toDate()

    const userStartDateDifFromPlan = Math.abs(moment(planData[0].workout_date).diff(moment(this.startDate), 'days'))

    this.days = planData.map((el) => ({
      ...el,
      workout_date: moment(el.workout_date).add(userStartDateDifFromPlan, 'days').toDate(),
    }))
  }
}
