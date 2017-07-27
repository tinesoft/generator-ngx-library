# How to revert a package releasing that's gone wrong?

Despite all efforts, put in to provide a simple and error-less releasing process (thanks to pre-release checks, among others),
it is still possible that something goes wrong during the process, and that you might want to revert the changes introduced.

Depending on which [release step](https://github.com/tinesoft/generator-ngx-library#releasing) caused the failure, you can rollback some of
the changes made, by doing so:

```
git reset --hard head~1         # revert to the last commit before you ran `gulp release ...`
git tag -d vX.X.X               # localy delete the newly create tag of the version 
git push origin :vX.X.X         # remotely delete the newly created tag on github
[fix and git commit]
git push origin master  -f      # force commit on master to override changes due to version upgrade
```

> **Note:** If the package was already successfully published on NPM, it is not possible to publish the same version again (even if you do the previous actions + [npm unpublish yourpackage@X.X.X](https://docs.npmjs.com/cli/unpublish))
> 
> The only thing to do, is to fix the issue, commit with the appropriate message  and `gulp release --version=patch` to release a fix version (X.X.X+1)
