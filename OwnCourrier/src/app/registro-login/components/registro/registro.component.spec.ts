import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { async } from 'rxjs';
import { RegistroService } from 'src/app/core/services/registro/registro.service';

import { RegistroComponent } from './registro.component';

class MockAuthService extends RegistroService {
  isAuthenticated() {
    return 'Mocked';
  }
}

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroComponent ]
    })
    .compileComponents();
  });

  

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});

