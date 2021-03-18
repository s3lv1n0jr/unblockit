import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UnblockItTestModule } from '../../../test.module';
import { FeedbackComponent } from 'app/entities/feedback/feedback.component';
import { FeedbackService } from 'app/entities/feedback/feedback.service';
import { Feedback } from 'app/shared/model/feedback.model';

describe('Component Tests', () => {
  describe('Feedback Management Component', () => {
    let comp: FeedbackComponent;
    let fixture: ComponentFixture<FeedbackComponent>;
    let service: FeedbackService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [FeedbackComponent],
      })
        .overrideTemplate(FeedbackComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FeedbackComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FeedbackService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Feedback(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.feedbacks && comp.feedbacks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
