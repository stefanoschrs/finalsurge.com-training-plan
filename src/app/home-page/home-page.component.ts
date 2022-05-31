import { Component, OnInit } from '@angular/core'

import moment from 'moment'

import plan26 from '../../assets/Marathon_Training_Plan_Level_3_Combo_Runner.json'
import plan50 from '../../assets/50_Mile_-_100K_Training_Plan_Level_3.json'
import plan100 from '../../assets/100_mile_Training_Plan_Level_3.json'
import { TrainingDay } from '../../interfaces'

const localStoragePlanKey = 'running-calendar_plan'
const localStorageStartDateKey = 'running-calendar_start-date'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: []
})
export class HomePageComponent implements OnInit {
  plans: any[]

  days!: TrainingDay[]

  plan: string
  startDate: Date
  endDate!: Date
  today: moment.Moment
  locked: boolean

  constructor () {
    this.today = moment()
    this.locked = true

    this.plans = [
      {
        key: 'plan26',
        value: 'McMillan Running: Marathon Training Plan Level 3 Combo Runner',
        plan: plan26
      },
      {
        key: 'plan50',
        value: 'McMillan Running: 50 Mile - 100K Training Plan Level 3',
        plan: plan50
      },
      {
        key: 'plan100',
        value: 'McMillan Running: 100 Mile Training Plan Level 3',
        plan: plan100
      }
    ]

    const savedStartDate = window.localStorage.getItem(localStorageStartDateKey)
    if (savedStartDate) {
      this.startDate = new Date(savedStartDate)
    } else {
      this.startDate = new Date()
      window.localStorage.setItem(localStorageStartDateKey, this.startDate.toISOString())
    }
    const savedPlan = window.localStorage.getItem(localStoragePlanKey)
    if (savedPlan) {
      this.plan = savedPlan
    } else {
      this.plan = this.plans[0].key
      window.localStorage.setItem(localStoragePlanKey, this.plan)
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

  updatePlan (ev: Event) {
    this.plan = (ev.target as HTMLSelectElement).value
    window.localStorage.setItem(localStoragePlanKey, this.plan)

    this.locked = true

    this.processPlan()
  }

  onStartDateChange (ev: Date) {
    this.startDate = new Date(ev)
    window.localStorage.setItem(localStorageStartDateKey, this.startDate.toISOString())

    this.locked = true

    this.processPlan()
  }

  onEndDateChange (ev: Date) {
    this.endDate = new Date(ev)

    const planData = this.plans.find((p) => p.key === this.plan).plan.data
    const numberOfWeeks = planData[0].plan_instance_info.number_of_weeks
    const startDate = moment(this.endDate).subtract(numberOfWeeks, 'weeks').toDate()
    window.localStorage.setItem(localStorageStartDateKey, startDate.toISOString())

    this.locked = true

    this.processPlan(false)
  }

  getDayClass (day: any) {
    const workoutDate = moment(day.workout_date)
    return {
      'is-past': workoutDate.isBefore(this.today, 'day'),
      'is-today': this.today.isSame(workoutDate, 'day'),
      'is-type-recovery': day.name.includes('Recovery Day'),
    }
  }

  private processPlan (fromStartDate: boolean = true) {
    const planData = this.plans.find((p) => p.key === this.plan).plan.data
    const numberOfWeeks = planData[0].plan_instance_info.number_of_weeks

    if (fromStartDate) {
      this.endDate = moment(this.startDate).add(numberOfWeeks, 'weeks').toDate()
    } else {
      this.startDate = moment(this.endDate).subtract(numberOfWeeks, 'weeks').toDate()
    }

    const planFirstDay = moment(planData[0].workout_date)
    const userStartDateDifFromPlan = Math.abs(planFirstDay.diff(moment(this.startDate), 'days'))
    const planInTheFuture = planFirstDay.isAfter(this.startDate)

    this.days = planData.map((el: any) => {
      const workoutDate = moment(el.workout_date)
      if (planInTheFuture) {
        workoutDate.subtract(userStartDateDifFromPlan, 'days')
      } else {
        workoutDate.add(userStartDateDifFromPlan, 'days')
      }

      return {
        ...el,
        workout_date: workoutDate.toDate()
      }
    })
  }
}
