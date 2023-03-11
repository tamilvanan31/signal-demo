import {Component, computed, effect, OnInit, signal} from "@angular/core";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'counter',
  template: `
    <h2>Count: {{count()}}</h2>
    <h2>Double count: {{doubleCount()}}</h2>
    <!--    This will reset count to 4-->
    <button type="button" (click)="updateCountByFour()">Update</button><br><br>
    <button type="button" (click)="incrementCount()">Increment count</button>
    <ul *ngFor="let i of history()">
      <li>{{i}}</li>
    </ul>
  `,
  standalone: true,
  imports: [NgForOf]
})

export class CounterComponent implements OnInit{

  count = signal(0); // signal
  doubleCount = computed(() => this.count() * 2); // computed signal
  history = signal<number[]>([]);
  incrementCount() {
    this.count.update(state => {
     return ++state;
    });
  }

  updateCountByFour() {
    this.count.set(4);
  }
  ngOnInit(): void {
    effect(() => this.history.mutate(value => {
      value.push(this.count())
    }))
  }
}
