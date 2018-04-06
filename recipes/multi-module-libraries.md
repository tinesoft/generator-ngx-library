# How to create a multi-module library?

Creating a multi-module library is very simple and supported out-of-the-box by the generator.

## Setup

First, this is how you could organize your `src/` to have a meaningful multi-module project:

```

my-ngx-library/
  |- src/
  |  |	|- moduleA/
  |  |	|  |- a.component.html
  |  |	|  |- a.component.scss
  |  |	|  |- a.component.spec.ts
  |  |	|  |- a.component.ts
  |  |	|  |- a.module.ts
  |  |	|  |- index.ts    # optional
  |  |	|- moduleB/
  |  |	|  |- b.component.html
  |  |	|  |- b.component.scss
  |  |	|  |- b.component.spec.ts
  |  |	|  |- b.component.ts
  |  |	|  |- b.module.ts
  |  |	|  |- index.ts    # optional
  |  |	|- index.ts
  |  |	|- tsconfig.lib.es5.ts      # if targeting Angular v4.x.x
  |  |	|- tsconfig.lib.json
  |  |	|- tsconfig.spec.json

```

Then, in `src/index.ts`, which is the main entrypoint to expose your API library:

```ts

export { AModule} from './a/index'; // or more explicily: export { AModule} from './a/a.module';
export { BModule} from './b/index'; // or more explicily: export { BModule} from './b/b.module';

```

In a sub-module `moduleA/a.module.ts` (similarly in `moduleB/b.module.ts`) :

```ts

import { AComponent } from './a.component';

export { AComponent } from './a.component'; // to be able to import your component

@NgModule({
  imports: [],
  exports: [AComponent], // very important, to expose your component outside of this NgModule
  declarations: [AComponent],
  providers: []
})
export class AModule {
}

```

In a sub-module `moduleA/index.ts` (similarly in `moduleB/indx.ts`) :

```ts

export * from 'a.module';

```

A couple of important things to keep in mind:

* Angular components, filters, pipes... need to be in `exports` array of their `NgModule` (not just in `declarations` array)
* About usage of [`barrels`](https://basarat.gitbooks.io/typescript/docs/tips/barrel.html) :
  * Instead of : ~~export { MyModule } from './a'~~
  * Use explicit: `export { MyModule } from './a/index'`
  * Or even more explicit: `export { MyModule } from './a/a.module'`

That's it! Your multi-module library is set :)

Additionally, you can have a look at excellent [ng-bootstrap](https://github.com/ng-bootstrap/ng-bootstrap) for realife example of how to properly organize your multi-module ng library files.

Happy ng-hacking!


## Troubleshooting

In case you get the following error when using your built library (in demo app for example):

> ERROR in Error: Unexpected value 'AModule' in [...] imported by the module '...' in [...]. 
> Please add a @NgModule annotation.

Make sure you followed all the steps described above.

