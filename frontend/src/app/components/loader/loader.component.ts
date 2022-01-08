import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  loading: boolean;
  constructor(public loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.isLoading.subscribe((v) => {
      console.log(v);
      this.loading = v;
    });
  }
}
