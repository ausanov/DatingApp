import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Member } from 'src/app/_models/Member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
	selector: 'app-member-detail',
	templateUrl: './member-detail.component.html',
	styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
	public member: Member;
	public galleryOptions: NgxGalleryOptions[];
	public galleryImages: NgxGalleryImage[];

	private onDestroy$: Subject<void> = new Subject<void>();

	constructor(private membersService: MembersService, private route: ActivatedRoute) {
		this.member = {} as Member;
		this.galleryImages = [];
		this.galleryOptions = [
			{
				width: '500px',
				height: '500px',
				imagePercent: 100,
				thumbnailsColumns: 4,
				imageAnimation: NgxGalleryAnimation.Slide,
				preview: false
			}
		];
	}

	ngOnInit(): void {
		this.loadMember();
	}

	private getImages(): NgxGalleryImage[] {
		const imageUrls: NgxGalleryImage[] = [];

		this.member.photos?.forEach((p) => {
			imageUrls.push({
				small: p?.url,
				medium: p?.url,
				big: p?.url
			});
		});

		return imageUrls;
	}

	private loadMember() {
		let userIdParam = this.route.snapshot.paramMap.get('id');
		if (userIdParam) {
			this.membersService.getMember(parseInt(userIdParam, 10)).pipe(takeUntil(this.onDestroy$)).subscribe((m) => {
				this.member = m;
				this.galleryImages = this.getImages();
			});
		}
	}
}
