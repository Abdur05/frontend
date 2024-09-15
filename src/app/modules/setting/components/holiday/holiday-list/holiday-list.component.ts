import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { MatDialog } from '@angular/material/dialog';
import { AddHolidayComponent } from '../add-holiday/add-holiday.component';
import { HolidayService } from '../../../services/holiday/holiday.service';
import { EditHolidayComponent } from '../edit-holiday/edit-holiday.component';
import { CompanyCalenderService } from '../../../services/company-calender/company-calender.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions/calendar-event-actions.component';
import { EventViewDialogComponent } from '../event-view-dialog/event-view-dialog.component'

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.css']
})
export class HolidayListComponent {
  isShowPadding: any = false
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  modalData: any = {
    action: '',
    event: '',
    data: ''
  };
  rolesDetails: any = [];
  rolesView: any = [];
  isShow: any = false
  eventdetails: any = []
  actions: CalendarEventAction[] = [
    {
      label: '<button class="btn btn-primary">Edit</button>',
      // a11yLabel: 'Edit',
      onClick: ({ event, sourceEvent }: { event: CalendarEvent; sourceEvent: MouseEvent | KeyboardEvent }): void => {
        const data = this.data; // Assuming `this.data` is defined in the class;
        this.calenderEdit(event)
      },
    },
    {
      label: '<button>Delete</button>',
      // a11yLabel: 'Delete',
      onClick: ({ event, sourceEvent }: { event: CalendarEvent; sourceEvent: MouseEvent | KeyboardEvent }): void => {
        const data = this.data; // Assuming `this.data` is defined in the class
        // this.openDialogEdit(event, data);
      },
    },
  ];


  calenderEdit(event: any) {
    console.log(event, event._id)
    this.openDialogEdit(event._id, event.eventId);

  }

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: { ...colors['yellow'] },
    //   // actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'Mothers Day Event',
    //   color: { ...colors['blue'] },
    //   // actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: { ...colors['yellow'] },
    //   actions: this.actions,
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: { ...colors['blue'] },
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'A draggable and resizable event',
    //   color: { ...colors['yellow'] },
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // }
  ];


  activeDayIsOpen: boolean = true;
  data: any;
  isShowScreenMenu: any = true;

  constructor(
    private modal: NgbModal,
    private matDialog: MatDialog,
    private holidaySer: HolidayService,
    private companyCalenderSer: CompanyCalenderService,
    private cd: ChangeDetectorRef,
    private _snackBar: MatSnackBar
  ) {
    this.getAllEventDetails();
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }

    console.log("this.viewDate ---", events )
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log("event-----", event, "----action----", action);
    const dialogRef = this.matDialog.open(EventViewDialogComponent, {
      width: '600px',
      height: '400px',
      data: { event },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.matDialog.open(AddHolidayComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.events = []
        this.getAllEventDetails()
      }
    });
  }

  openDialogEdit(yearlyEventId: any, eventId: any) {
    console.log(yearlyEventId, 'kkkkk')
    const dialogRef = this.matDialog.open(EditHolidayComponent, {
      data: [yearlyEventId, eventId]

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.events = []
        this.getAllEventDetails()
      }
    });
  }

  async getAllEventDetails() {
    try {
      const date = new Date();
      const year = date.getFullYear();
      
      // Initialize empty calendar
      this.events = []; 
      
      const result: any = await this.companyCalenderSer.getAllCompanyCalenderDetail(year);
      console.log(result);
  
      if (result.status) {
        let actions: any = '';
        if (this.rolesView?.modify === true) {
          actions = this.actions;
        }
  
        this.eventdetails = result.data;
        console.log(this.eventdetails, 'kkkkkk');
  
        // Check if there are no events
        if (result.data.length === 0) {
          // Optionally, add a placeholder event or leave the calendar empty
          console.log("No events found for the year");
          return;
        }
  
        // Process events if available
        result.data.map((el: any, i: any) => {
          const colorDetails = el.eventList[i]?.eventTitle ? colors['aqua'] : colors['blue'];
          console.log(el.eventList[i]?.eventTitle, 'index', i);
  
          el.eventList.map((ele: any) => {
            console.log("ele---", ele);
            const eventDetails = {
              _id: el._id,
              eventId: ele._id,
              start: subDays(startOfDay(new Date(ele.startDate)), 0),
              end: addDays(new Date(ele.endDate), 0),
              startTime: ele.startTime ?? '00:00',
              endTime: ele.endTime ?? '00:00',
              title: ele.eventTitle,
              description: ele.eventDescription,
              color: { ...colorDetails },
              actions: actions,
              allDay: true,
              resizable: {
                beforeStart: true,
                afterEnd: true,
              },
            };
            this.events.push(eventDetails);
          });
        });
  
        console.log(this.events);
      }
    } catch (error) {
      console.error(error);
    }
  }  

  async deleteRecords(data: any) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this record?",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes",
        cancelButtonText: 'No'
      }).then(async (result) => {
        if (result.isConfirmed) {
          data.isActive = data.isActive === 'true' ? 'false' : 'true'
          data.disable = true
          const result: any = await this.companyCalenderSer.deleteCompanyCalenderDetail(data);
          if (result.status === true) {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllEventDetails()
            return;
          }
          if (result.status === false) {
            this.getAllEventDetails()
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllEventDetails()
        }
      });
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


}
