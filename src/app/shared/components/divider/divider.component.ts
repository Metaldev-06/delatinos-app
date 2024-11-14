import { Component } from '@angular/core';

interface DividerData {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-divider',
  standalone: true,
  imports: [],
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.css'
})
export class DividerComponent {
  public dividerData: DividerData[] = [
    {
      image:"/images/truck-icon.png",
      title: "Envios",
      description: "Nuestros proveedores llegan dentro de toda Argentina"
    },{
      image:"/images/money-icon.png",
      title: "Opciones de Pago",
      description: "Tenemos varias formas de pago"
    },{
      image:"/images/like-icon.png",
      title: "Sitio de Confianza",
      description: "Protegemos tu privacidad"
    },
  ]

}
