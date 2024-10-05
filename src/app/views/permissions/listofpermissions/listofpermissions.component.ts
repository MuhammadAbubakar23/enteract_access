import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Toast, ToastrService } from 'ngx-toastr';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { PermissionService } from 'src/app/services/permissionService/permission.service';

@Component({
  selector: 'app-listofpermissions',
  templateUrl: './listofpermissions.component.html',
  styleUrls: ['./listofpermissions.component.css']
})
export class ListofpermissionsComponent implements OnInit {

  // message: string[] = ["Permissions", "", "", "", "", "", "", "", "fal fa-business-time","/dashboard/listofpermissions"];
  message: any = {
    title: "Permissions",
    Icon: "fal fa-business-time",
    subTitle: "",
    Url: "/dashboard/listofpermissions"
  }
  permissions: any;
  permissionCount: any;
  search: string = "";

  constructor(private dataShare: DatashareService,
    private permissionService: PermissionService,
    private toastr: ToastrService,
    private SpinnerService: NgxSpinnerService) {
      this.SpinnerService.show();
    setTimeout(() => {
      this.SpinnerService.hide();
    }, 4000);
  }

  ngOnInit(): void {
    this.getAllPermissions();
    this.dataShare.sendMessage(this.message);
  }


  getAllPermissions() {
    this.SpinnerService.show();
    this.permissionService.getAll(this.search).subscribe((res: any) => {
      this.permissions = res.data;
      this.permissionCount = res.data.count;
      console.log(res);
      this.SpinnerService.hide();

    })
  }


  DeletePermission(id: any) {
    
    this.permissionService.delete(id).subscribe((res: any) => {
      this.toastr.success("Deleted Successfully", "Deleted");
      this.getAllPermissions();

    })

  }

}
