import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/layouts/shared/models/CardDto';
import { CardService } from 'src/app/services/CardService/card.service';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import {ChangeDetectorRef} from '@angular/core'



@Component({
  selector: 'app-listofcards',
  templateUrl: './listofcards.component.html',
  styleUrls: ['./listofcards.component.css']
})
export class ListofcardsComponent implements OnInit {
  isChecked: boolean = false;
  showIcons: boolean = false;
  allSelected: boolean = false;
  selectedIds: any[] = []
  changeText: boolean;
  machines = []
  cards: any[] = [
];
isActive:boolean=true
Ending_Point:any
Starting_Point:any
startingpoint:any
pageNumber:any=1
pageSize: any = 15;
totalCount:any
totalCardsCount:any
endingpoint:any
Page_No:any=1
p: any =1;
totalPages:any
isCheckedStatus:any[]=[]
ItemsPerPage: any = 15;
deleteCardID:number[]
checkedcardStatus:any
data :any[]
showMore: boolean = false;
recentlyAdded=[]
sort:string;
locations:any[]=[];
card:number[]=[]
cardId:number[]=[];
  lastFourRecords = [];
  paginatedRecords:any[]=[]
  text = ""
  updateStatus:any
  unselectedbox:any=[]
  // message: string[] = ["Access Cards", "", "", "", "", "", "", "", "fa-light fa-address-card", "cardmanagement/listofcards", "", ""]

  message : any = {
    title: "Access Cards",
    Icon: "fa-light fa-address-card",
    subTitle: "",
    Url: "cardmanagement/listofcards"
  }
  modalRef: BsModalRef
  constructor(
    private dataShare: DatashareService,
    private cardService: CardService,
    private toaster: ToastrService,
    private router: Router,
     private SpinnerService: NgxSpinnerService,
     private modalService: BsModalService
  
  ) {
    this.SpinnerService.show();
    setTimeout(() => {
      this.SpinnerService.hide();
    }, 1000);
    this.changeText = false;
   }
  // objectKeys(obj: object): string[] {
  //   return Object.keys(obj).filter((keys) => keys.startsWith('192.168.'));
  // }
  //let item of myArray.slice(-4)
  ngOnInit(): void {
    this.allCards();
    this.dataShare.sendMessage(this.message)
    const storedIds = localStorage.getItem('selectedIds');
    if (storedIds) {
      this.selectedIds=[]
      this.selectedIds = JSON.parse(storedIds);
    }
    this.refresh()
  }
  //lastFourRecords=this.cards.slice(-4).reverse();
  allCards() { 
    debugger
    this.SpinnerService.show();
    // if(this.text.length===0)
    // this.pageNumber=1
    if(this.sort==undefined){
      this.sort="Newest"
      this.pageNumber=1
    }
    this.cardService.getAllCards(this.text,this.pageNumber,this.pageSize,this.sort).subscribe((res: any) => {
      console.log("All Cards received", res);
    
      this.isCheckedStatus=res.paginatedRecords
      this.isCheckedStatus?.forEach((x:any)=>{
      this.checkedcardStatus=x.status
    if(this.checkedcardStatus=='InActive'){
      this.isActive=true
    }
    else{
      this.isActive=false
    }
      })
    debugger
      this.cards = res.paginatedRecords;//is an object
      console.log("card data====>", this.cards);
      this.lastFourRecords = res.recentlyAdded.slice(0,4)
      if (Array.isArray(this.recentlyAdded
        )) {
        // this.lastFourRecords = this.cards.slice(0, 4);
      }
      this.SpinnerService.hide();
      if (res.pageNumber==1){
        this.Starting_Point=1
       }
       else{
        this.Starting_Point= (res.pageNumber-1)*(res.pageSize)+1
       }
       this.Ending_Point=res.pageNumber==res.totalPages ? res.totalCount:
      res.pageNumber *res. pageSize;
      this.totalCardsCount=res.totalCount
      this.totalPages=res.totalPages
      this.pageNumber=res.pageNumber

    });
  }
  isAdminLoggedIn(): boolean {
    const loggedInUser = localStorage.getItem("username");
    return loggedInUser.includes("hr");
 }
  // machine(){
  //   this.cardService.getAllCards(this.text).subscribe((res: any) => {
  //     console.log("All Cards received", res)
  //     this.cards = res;
  // }
getsortvalue(evt){

  
  this.sort=evt.target.innerHTML;
  this.allCards()
}
 
  filterItems() {
  
    console.log("Filtering", this.text)
    
    if (this.text.length > 4) {
      this.Starting_Point=1;
      this.Ending_Point=this.totalCardsCount
      this.allCards();
    }
  
     if (this.text.length === 0) {
    this.allCards()
    
       }

  }

  refresh(){
    this.pageNumber=1;
    this.allCards();
    this.selectedIds = [];
    this.isChecked=false;
    this.allSelected=false;
    this.showIcons=false;
   
  }
 detedtedcardId(cardId:number[]){
    this.deleteCardID=cardId 
   
 }

 
  
  deleteCard(cardId: number[]) {

console.log("card Id====>",this.cards
)
    if (  cardId !=null   ) {
      
      this.selectedIds.push(cardId)
    }
   
    console.log("delete card",cardId, this.selectedIds)
    
     const data = {
      
      ids: this.selectedIds
    }
  
    this.cardService.deleteAccessToDevice(this.selectedIds)
    .subscribe((res: any) => {
      console.log("Response", res)
    
  
      if (res.status === 200) {
     
      this.NextPage(this.pageNumber-1);
     
        if (cardId !== null) {
          this.cards = this.cards.filter((card) => {
            return card.cardId !== cardId;
          });
        }  else {
          this.cards = this.cards.filter((item) => {
            return !this.selectedIds.includes(item.cardId);
          });
        }
        this.selectedIds = []
         this.lastFourRecords = this.cards.slice(0,4)
          this.toaster.success("Successfully deleted card", "success")
      }
      else {
         this.selectedIds = []
        this.toaster.error("Error while deleted card ", "Error")
      }
      
  

    }, error => {
    


    });
    this.selectedIds = [];
    this.isChecked=false;
    this.allSelected=false;
    this.showIcons=false;

   
  }
 


  
   
  isSelected(id: number) {
  
    return this.selectedIds.indexOf(id) >= 0;
  }
  toggleSelection(id: number) {
   
    const index = this.selectedIds.indexOf(id);
    console.log('index==++>',index)
    if (index >= 0) {
      this.selectedIds.splice(index, 1);
    } else {
      this.selectedIds.push(id);
    }

    console.log(this.selectedIds)
    localStorage.setItem('selectedIds', JSON.stringify(this.selectedIds));

    if(this.selectedIds.length > 0){
      this.showIcons=true;
    }
    else{
      this.showIcons=false;
      this.isChecked=false;
      this.allSelected=false;
    }
  }
  
 
 disableBox() {
 

    this.isChecked=false;
   this.showIcons=false;
  }

  clearAll(){
    this.selectedIds = [];
    this.isChecked=false;
    this.allSelected=false;
    this.showIcons=false;
  }
  selectunselectAll() {

    this.allSelected=!this.allSelected;
    this.isChecked = !this.isChecked;
    if (this.isChecked) {
      this.selectedIds = this.cards.map(item => item.cardId);
    }
    else {
      this.selectedIds = [];
    }
    console.log("select all", this.selectedIds)
    if(this.selectedIds.length > 0){
      this.showIcons=true;
    }
    else{
      this.showIcons=false;
      
    }
  }


  NextPage(pageNumber: any) {
   
    let page = pageNumber +1;
  
    if (page < this.totalPages+1 ) {
    this.  pageNumber = page;

    this.allCards()
   
    }
  }
  
  PreviousPage(pageNumber: any) {
  
    if (pageNumber >= 1) {
      let page =pageNumber - 1;
      if (page > 0) {
        this.pageNumber = page;
  
    }
  
  }
  this.allCards()
}

checkCardStatus:any
updateCardStatus(cardId: string) {
  
  let obj={

  }
this.cardService.updateCardStatus(cardId,obj).subscribe((res:any)=>{
  
  this.checkCardStatus=res.data

this.allCards()
})


}

}