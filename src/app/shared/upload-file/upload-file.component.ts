import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput!: { nativeElement: any };
  @Input() label: string = "";
  @Input() multiple: boolean = false;
  @Input() showIcon: boolean = true;
  @Output() itemChange: EventEmitter<any> = new EventEmitter<any>();
  uploadResponse: any = [];
  data: any = {};
  constructor(
    public uploader: FileUploadService,
    private readonly cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  upLoad(files: any) {
    if (files && files.length > 0) {
      this.uploadLocal(files);
      this.uploader.postFile(files).subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
        } else if (event instanceof HttpResponse) {
          this.itemChange.emit(event.body)
          this.fileInput.nativeElement.value = "";
        }
      },
        err => {
        })
    }
  }
  uploadLocal(selectedFiles: any): void {
    for (let i = 0; i < selectedFiles.length; i++) {
      const reader: FileReader = new FileReader();
      const file: File = selectedFiles[i];
      this.uploadResponse[i] = {
        fileName: file.name,
        fileType: file.type,
        url: null,
      };
      reader.readAsDataURL(selectedFiles[i]);
      reader.onload = (event: ProgressEvent<FileReader>) => {
        this.uploadResponse[i].url = event?.target?.result as string;
        this.cdr.markForCheck();
      };
    }
  }
}
